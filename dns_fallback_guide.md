# DNS Fallback Guide — shaktiphotonsolutions.com
**Created:** 10 June 2026  
**Reason:** Domain switched from Wix → Vercel for new website launch

---

## Current Setup (Vercel — LIVE as of 10 June 2026)

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A | `@` | `216.198.79.1` | 1 Hour |
| CNAME | `www` | `c800d7675073cd50.vercel-dns-017.com` | 1 Hour |

**Wix domain status:** Unassigned from Wix site (content at `info8776850.wixsite.com/shaktiphotonsolution`)

---

## Original Wix DNS (ROLLBACK values — DO NOT DELETE THIS)

> [!CAUTION]
> These are the values to restore if you need to fall back to Wix. Keep this document safe.

### A Records (Wix hosting IPs — need all 3)
| Type | Host | Value | TTL |
|------|------|-------|-----|
| A | `shaktiphotonsolutions.com` | `185.230.63.171` | 1 Hour |
| A | `shaktiphotonsolutions.com` | `185.230.63.186` | 1 Hour |
| A | `shaktiphotonsolutions.com` | `185.230.63.107` | 1 Hour |

### CNAME (www)
| Type | Host | Value | TTL |
|------|------|-------|-----|
| CNAME | `www.shaktiphotonsolutions.com` | `cdn1.wixdns.net` | 1 Hour |

### 🔒 Records that were NOT changed (keep forever)
| Type | Host | Value | Purpose |
|------|------|-------|---------|
| TXT | `shaktiphotonsolutions.com` | `v=spf1 include:_spf.google.com ~all` | Google email (do not touch) |
| MX | `shaktiphotonsolutions.com` | `aspmx.l.google.com` (priority 1) | Google Workspace email |
| MX | `shaktiphotonsolutions.com` | `alt1.aspmx.l.google.com` (priority 5) | Google Workspace email |
| MX | `shaktiphotonsolutions.com` | `alt2.aspmx.l.google.com` (priority 5) | Google Workspace email |
| MX | `shaktiphotonsolutions.com` | `alt3.aspmx.l.google.com` (priority 10) | Google Workspace email |
| MX | `shaktiphotonsolutions.com` | `alt4.aspmx.l.google.com` (priority 10) | Google Workspace email |

---

## How to Fall Back to Wix (Emergency Rollback)

### Step 1 — Go to Wix DNS
Wix Dashboard → Domains → `shaktiphotonsolutions.com` → Manage DNS Records

### Step 2 — Replace A records
- **Delete:** `216.198.79.1` (Vercel)
- **Add back all 3 Wix IPs:**
  - `185.230.63.171`
  - `185.230.63.186`
  - `185.230.63.107`

### Step 3 — Restore CNAME
- Change `www` CNAME value back to: `cdn1.wixdns.net`

### Step 4 — Re-assign domain in Wix
Wix Dashboard → Domains → `shaktiphotonsolutions.com` → **Assign to a site** → Select `Shaktiphotonsolution`

### Step 5 — Wait
DNS propagation: 15–60 minutes. Test at [dnschecker.org](https://dnschecker.org)

---

## Notes
- Wix site content is **fully intact** at `info8776850.wixsite.com/shaktiphotonsolution`
- Business email (Google Workspace) was **not affected** by this switch — MX records untouched
- Vercel project: `shakti-photon-solutions` under account `Gyan's projects`
